use crate::types::{PixelChannels, HSL};

#[inline]
pub fn get_hsl(_hsl_type: HSL) -> fn(PixelChannels, u8) -> PixelChannels {
    |pixel_channels, _filter_value| pixel_channels
}
