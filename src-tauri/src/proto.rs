use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct DedropMessage {
    pub filename: String,
    pub contents: Vec<u8>,
}
