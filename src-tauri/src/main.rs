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

use tokio::io::AsyncReadExt;

fn main() {
    let config = Config::new().unwrap_or_else(|_| panic!("invalid config"));

    tauri::Builder::default()
        .manage(config)
        .invoke_handler(tauri::generate_handler![
            load_file,
            get_private_key,
            filter_contacts
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

fn opt_os_str_to_string(opt_os_str: Option<&std::ffi::OsStr>) -> Result<String, Error> {
    opt_os_str
        .and_then(|file_stem| file_stem.to_str())
        .map(|file_stem_str| file_stem_str.to_string())
        .ok_or(Error::PathMissingFileStem)
}

#[tauri::command]
fn get_private_key(state: tauri::State<'_, Config>) -> [u8; 32] {
    state.private_key.clone()
}

#[tauri::command]
fn filter_contacts(state: tauri::State<'_, Config>, filter: String) -> HashMap<String, [u8; 32]> {
    state
        .contacts
        .iter()
        .filter(|(key, _)| key.contains(&filter))
        .map(|(key, value)| (key.clone(), value.clone()))
        .collect()
}
