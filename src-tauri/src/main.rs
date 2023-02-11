#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod proto;
use std::collections::HashMap;

use proto::DedropMessage;

mod error;
use error::Error;

mod config;
use config::{Config, FileData};

use tauri::{async_runtime::RwLock, State};
use tokio::io::{AsyncReadExt, AsyncWriteExt};

fn main() {
    let config = Config::new().unwrap_or_else(|e| panic!("invalid config, reason: {:?}", e));

    tauri::Builder::default()
        .manage(RwLock::new(config))
        .invoke_handler(tauri::generate_handler![
            load_file,
            save_file,
            get_private_key,
            filter_contacts,
            add_contact,
            del_contact,
            get_files
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn load_file(path: &str) -> Result<DedropMessage, Error> {
    let path = std::path::Path::new(path);

    let filename = opt_os_str_to_string(path.file_name())?;

    let mut file = tokio::fs::File::open(path).await?;

    let mut contents = vec![];
    file.read_to_end(&mut contents).await?;

    Ok(DedropMessage { filename, contents })
}

#[tauri::command]
async fn save_file(
    state: State<'_, RwLock<Config>>,
    public_key: &str,
    payload: &str,
) -> Result<(), Error> {
    let msg: DedropMessage = serde_json::from_str(payload)?;

    state
        .write()
        .await
        .add_file(public_key, &msg.filename, msg.contents.len() as u64)?;

    let msg_dir_buf = dirs::download_dir()
        .ok_or(Error::InvalidConfigDir)?
        .join("dedrop");
    let msg_dir = msg_dir_buf.as_path();

    std::fs::create_dir_all(msg_dir)?;

    let msg_path_buf = msg_dir_buf.join(std::path::Path::new(&msg.filename));
    let msg_path = msg_path_buf.as_path();

    let mut file = tokio::fs::File::create(msg_path).await?;
    file.write_all(&msg.contents).await?;

    Ok(())
}

fn opt_os_str_to_string(opt_os_str: Option<&std::ffi::OsStr>) -> Result<String, Error> {
    opt_os_str
        .and_then(|file_stem| file_stem.to_str())
        .map(|file_stem_str| file_stem_str.to_string())
        .ok_or(Error::PathMissingFileStem)
}

#[tauri::command]
async fn get_private_key(state: State<'_, RwLock<Config>>) -> Result<String, Error> {
    Ok(state.read().await.private_key.clone())
}

#[tauri::command]
async fn filter_contacts(
    state: State<'_, RwLock<Config>>,
    filter: String,
) -> Result<HashMap<String, String>, Error> {
    Ok(state
        .read()
        .await
        .contacts
        .iter()
        .filter(|(key, _)| key.contains(&filter))
        .map(|(key, value)| (key.clone(), value.name.clone()))
        .collect())
}

#[tauri::command]
async fn add_contact(
    state: State<'_, RwLock<Config>>,
    public_key: String,
    name: String,
) -> Result<(), Error> {
    state.write().await.add_contact(public_key, name)
}

#[tauri::command]
async fn del_contact(state: State<'_, RwLock<Config>>, public_key: String) -> Result<(), Error> {
    state.write().await.del_contact(public_key)
}

#[tauri::command]
async fn get_files(state: State<'_, RwLock<Config>>) -> Result<Vec<(String, FileData)>, ()> {
    let mut vec: Vec<(String, FileData)> = state
        .read()
        .await
        .contacts
        .iter()
        .flat_map(|x| {
            x.1.files
                .iter()
                .map(|file| (x.0.clone(), file.to_owned()))
                .collect::<Vec<(String, FileData)>>()
        })
        .collect();

    vec.sort_by(|a, b| {
        let x = a.0.cmp(&b.0);

        if !x.is_eq() {
            return x;
        }

        return a.1.time.cmp(&b.1.time);
    });

    Ok(vec)
}
