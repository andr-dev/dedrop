use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct AirdropMessage {
    pub filename: String,
    pub contents: Vec<u8>,
}
