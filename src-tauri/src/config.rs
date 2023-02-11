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
        let config_dir_buf = dirs::config_dir()
            .ok_or(Error::InvalidConfigDir)?
            .join(std::path::Path::new("airdrop/airdrop.json"));

        let config_dir = config_dir_buf.as_path();

        if !config_dir.exists() {
            let mut config_file = std::fs::File::create(config_dir)?;

            config_file.write(serde_json::to_string(&Config::default())?.as_bytes())?;
        }

        let mut config_file = std::fs::File::open(config_dir)?;

        let mut contents = vec![];
        config_file.read_to_end(&mut contents)?;

        let config = serde_json::from_slice::<Config>(&contents)?;

        Ok(config)
    }
}
