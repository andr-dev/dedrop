use std::{
    collections::HashMap,
    io::{Read, Write},
};

use serde::{Deserialize, Serialize};

use crate::error::Error;

#[derive(Serialize, Deserialize)]
pub struct Config {
    pub private_key: [u8; 32],

    pub contacts: HashMap<String, [u8; 32]>,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            private_key: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0,
            ],
            contacts: HashMap::default(),
        }
    }
}

impl Config {
    pub fn new() -> Result<Self, Error> {
        let config_path_buf = dirs::config_dir()
            .ok_or(Error::InvalidConfigDir)?
            .join(std::path::Path::new("airdrop"));

        let config_dir_path = config_path_buf.as_path();

        let config_file_buf = config_path_buf.join(std::path::Path::new("airdrop.json"));
        let config_file_path = config_file_buf.as_path();

        if !config_dir_path.exists() {
            std::fs::create_dir_all(config_dir_path)?;
            
            let mut config_file = std::fs::File::create(config_file_path)?;

            config_file.write(serde_json::to_string(&Config::default())?.as_bytes())?;
            println!("done!");
        }

        let mut config_file = std::fs::File::open(config_file_path)?;

        let mut contents = vec![];
        config_file.read_to_end(&mut contents)?;

        let config = serde_json::from_slice::<Config>(&contents)?;

        Ok(config)
    }
}
