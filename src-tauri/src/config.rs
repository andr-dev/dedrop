use std::{
    collections::{HashMap, HashSet},
    io::{Read, Write},
};

use serde::{Deserialize, Serialize};

use crate::error::Error;

#[derive(Serialize, Deserialize)]
pub struct Config {
    pub private_key: String,

    pub contacts: HashMap<String, Contact>,
}

#[derive(Serialize, Deserialize, Hash, PartialEq, Eq, Clone)]
pub struct FileData {
    pub filename: String,
    pub size: u64,
    pub time: u128,
}

#[derive(Serialize, Deserialize)]
pub struct Contact {
    pub name: String,
    pub files: HashSet<FileData>,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            private_key: "".to_string(),
            contacts: HashMap::default(),
        }
    }
}

impl Config {
    pub fn new() -> Result<Self, Error> {
        let config_path_buf = dirs::config_dir()
            .ok_or(Error::InvalidConfigDir)?
            .join(std::path::Path::new("dedrop"));

        let config_dir_path = config_path_buf.as_path();

        let config_file_buf = config_path_buf.join(std::path::Path::new("dedrop.json"));
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

    pub fn add_contact(&mut self, public_key: String, name: String) -> Result<(), Error> {
        self.contacts.insert(
            public_key,
            Contact {
                name,
                files: HashSet::new(),
            },
        );

        self.sync()
    }

    pub fn del_contact(&mut self, public_key: String) -> Result<(), Error> {
        self.contacts.remove(&public_key);

        self.sync()
    }

    pub fn add_file(&mut self, public_key: &str, filename: &str, size: u64) -> Result<(), Error> {
        let contact = self
            .contacts
            .get_mut(public_key)
            .ok_or(Error::MissingContact)?;

        contact.files.insert(FileData {
            filename: filename.to_owned(),
            size,
            time: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_millis(),
        });

        self.sync()
    }

    fn sync(&mut self) -> Result<(), Error> {
        let config_path_buf = dirs::config_dir()
            .ok_or(Error::InvalidConfigDir)?
            .join(std::path::Path::new("dedrop"));

        let config_dir_path = config_path_buf.as_path();

        let config_file_buf = config_path_buf.join(std::path::Path::new("dedrop.json"));
        let config_file_path = config_file_buf.as_path();

        std::fs::create_dir_all(config_dir_path)?;

        let mut config_file = std::fs::File::create(config_file_path)?;

        config_file.write(serde_json::to_string(&self)?.as_bytes())?;

        Ok(())
    }
}
