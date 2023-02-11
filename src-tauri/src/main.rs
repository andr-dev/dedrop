#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod proto;
use std::collections::HashMap;

use proto::AirdropMessage;

mod error;
use error::Error;

mod config;
use config::Config;

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
            add_contact
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn load_file(path: &str) -> Result<AirdropMessage, Error> {
    let path = std::path::Path::new(path);

    let filename = opt_os_str_to_string(path.file_name())?;

    let mut file = tokio::fs::File::open(path).await?;

    let mut contents = vec![];
    file.read_to_end(&mut contents).await?;

    Ok(AirdropMessage { filename, contents })
}

#[tauri::command]
async fn save_file(payload: &str) -> Result<(), Error> {
    let msg: AirdropMessage = serde_json::from_str(payload)?;

    let msg_dir_buf = dirs::data_local_dir().ok_or(Error::InvalidConfigDir)?;
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
        .map(|(key, value)| (key.clone(), value.clone()))
        .collect())
}

#[tauri::command]
async fn add_contact(
    state: State<'_, RwLock<Config>>,
    name: String,
    stream: String,
) -> Result<(), Error> {
    state.write().await.add_contact(name, stream)
}
