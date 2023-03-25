export const pixelsProcessorInputArray = Uint8ClampedArray.from([
  227, 222, 218, 255, 228, 223, 219, 255, 230, 226, 223, 255, 233, 229, 226, 255, 233, 232, 228,
  255, 234, 233, 229, 255, 232, 232, 230, 255, 231, 231, 229, 255, 234, 236, 233, 255, 234, 236,
  233, 255, 225, 220, 217, 255, 227, 222, 219, 255, 230, 225, 222, 255, 231, 227, 226, 255, 231,
  227, 226, 255, 230, 229, 227, 255, 232, 231, 229, 255, 233, 233, 233, 255, 233, 233, 233, 255,
  232, 234, 233, 255, 225, 216, 217, 255, 226, 220, 220, 255, 229, 223, 223, 255, 230, 226, 227,
  255, 230, 226, 227, 255, 229, 227, 228, 255, 233, 231, 232, 255, 236, 234, 237, 255, 234, 232,
  235, 255, 233, 233, 235, 255, 222, 214, 212, 255, 224, 216, 214, 255, 225, 219, 219, 255, 227,
  221, 221, 255, 228, 224, 225, 255, 230, 226, 227, 255, 230, 228, 229, 255, 232, 230, 231, 255,
  232, 230, 233, 255, 232, 230, 233, 255, 216, 211, 207, 255, 217, 212, 208, 255, 219, 214, 210,
  255, 223, 218, 214, 255, 226, 222, 219, 255, 228, 224, 221, 255, 226, 225, 223, 255, 225, 224,
  222, 255, 232, 230, 231, 255, 232, 230, 231, 255, 218, 209, 204, 255, 218, 211, 205, 255, 219,
  212, 206, 255, 222, 215, 209, 255, 223, 218, 214, 255, 225, 220, 216, 255, 225, 221, 218, 255,
  226, 222, 219, 255, 234, 230, 229, 255, 234, 230, 229, 255, 215, 200, 195, 255, 217, 204, 198,
  255, 218, 205, 199, 255, 215, 204, 198, 255, 213, 204, 199, 255, 215, 206, 201, 255, 220, 212,
  209, 255, 226, 218, 215, 255, 224, 219, 216, 255, 224, 219, 216, 255, 207, 187, 178, 255, 211,
  191, 182, 255, 212, 193, 186, 255, 207, 190, 182, 255, 202, 185, 178, 255, 202, 187, 180, 255,
  212, 199, 193, 255, 220, 209, 203, 255, 210, 199, 195, 255, 210, 199, 195, 255, 187, 158, 144,
  255, 155, 127, 113, 255, 187, 161, 148, 255, 145, 122, 108, 255, 170, 146, 134, 255, 157, 135,
  122, 255, 152, 132, 121, 255, 205, 187, 177, 255, 215, 196, 189, 255, 208, 191, 183, 255, 184,
  151, 134, 255, 122, 91, 73, 255, 145, 116, 100, 255, 166, 139, 122, 255, 142, 116, 99, 255, 111,
  88, 72, 255, 105, 83, 69, 255, 203, 184, 170, 255, 240, 221, 207, 255, 218, 200, 186, 255, 201,
  170, 150, 255, 138, 107, 87, 255, 160, 131, 113, 255, 234, 207, 188, 255, 169, 144, 124, 255, 126,
  103, 85, 255, 96, 75, 58, 255, 198, 179, 164, 255, 243, 226, 210, 255, 217, 201, 185, 255, 193,
  165, 151, 255, 151, 125, 110, 255, 160, 137, 123, 255, 217, 195, 181, 255, 163, 144, 129, 255,
  155, 137, 123, 255, 131, 115, 102, 255, 199, 183, 170, 255, 226, 212, 199, 255, 215, 203, 189,
  255, 219, 200, 196, 255, 205, 187, 183, 255, 207, 189, 185, 255, 218, 203, 198, 255, 206, 192,
  189, 255, 217, 206, 202, 255, 210, 200, 198, 255, 236, 226, 224, 255, 221, 213, 210, 255, 226,
  218, 215, 255, 220, 208, 210, 255, 222, 212, 211, 255, 230, 220, 221, 255, 224, 215, 216, 255,
  232, 226, 226, 255, 227, 221, 223, 255, 220, 216, 217, 255, 224, 220, 221, 255, 226, 224, 225,
  255, 231, 229, 230, 255, 226, 220, 222, 255, 226, 222, 221, 255, 226, 222, 223, 255, 224, 222,
  223, 255, 231, 229, 230, 255, 224, 224, 226, 255, 225, 225, 227, 255, 230, 230, 232, 255, 227,
  228, 230, 255, 229, 230, 232, 255,
]);

export const numberOfRgbaPixels = pixelsProcessorInputArray.length;

export const grayscaleOutputArray = Uint8ClampedArray.from([
  222, 222, 222, 255, 223, 223, 223, 255, 226, 226, 226, 255, 229, 229, 229, 255, 231, 231, 231,
  255, 232, 232, 232, 255, 231, 231, 231, 255, 230, 230, 230, 255, 234, 234, 234, 255, 234, 234,
  234, 255, 221, 221, 221, 255, 223, 223, 223, 255, 226, 226, 226, 255, 228, 228, 228, 255, 228,
  228, 228, 255, 229, 229, 229, 255, 231, 231, 231, 255, 233, 233, 233, 255, 233, 233, 233, 255,
  233, 233, 233, 255, 219, 219, 219, 255, 222, 222, 222, 255, 225, 225, 225, 255, 228, 228, 228,
  255, 228, 228, 228, 255, 228, 228, 228, 255, 232, 232, 232, 255, 236, 236, 236, 255, 234, 234,
  234, 255, 234, 234, 234, 255, 216, 216, 216, 255, 218, 218, 218, 255, 221, 221, 221, 255, 223,
  223, 223, 255, 226, 226, 226, 255, 228, 228, 228, 255, 229, 229, 229, 255, 231, 231, 231, 255,
  232, 232, 232, 255, 232, 232, 232, 255, 211, 211, 211, 255, 212, 212, 212, 255, 214, 214, 214,
  255, 218, 218, 218, 255, 222, 222, 222, 255, 224, 224, 224, 255, 225, 225, 225, 255, 224, 224,
  224, 255, 231, 231, 231, 255, 231, 231, 231, 255, 210, 210, 210, 255, 211, 211, 211, 255, 212,
  212, 212, 255, 215, 215, 215, 255, 218, 218, 218, 255, 220, 220, 220, 255, 221, 221, 221, 255,
  222, 222, 222, 255, 231, 231, 231, 255, 231, 231, 231, 255, 203, 203, 203, 255, 206, 206, 206,
  255, 207, 207, 207, 255, 206, 206, 206, 255, 205, 205, 205, 255, 207, 207, 207, 255, 214, 214,
  214, 255, 220, 220, 220, 255, 220, 220, 220, 255, 220, 220, 220, 255, 191, 191, 191, 255, 195,
  195, 195, 255, 197, 197, 197, 255, 193, 193, 193, 255, 188, 188, 188, 255, 190, 190, 190, 255,
  201, 201, 201, 255, 211, 211, 211, 255, 201, 201, 201, 255, 201, 201, 201, 255, 163, 163, 163,
  255, 132, 132, 132, 255, 165, 165, 165, 255, 125, 125, 125, 255, 150, 150, 150, 255, 138, 138,
  138, 255, 135, 135, 135, 255, 190, 190, 190, 255, 200, 200, 200, 255, 194, 194, 194, 255, 156,
  156, 156, 255, 95, 95, 95, 255, 120, 120, 120, 255, 142, 142, 142, 255, 119, 119, 119, 255, 90,
  90, 90, 255, 86, 86, 86, 255, 186, 186, 186, 255, 223, 223, 223, 255, 201, 201, 201, 255, 174,
  174, 174, 255, 111, 111, 111, 255, 135, 135, 135, 255, 210, 210, 210, 255, 146, 146, 146, 255,
  105, 105, 105, 255, 76, 76, 76, 255, 180, 180, 180, 255, 226, 226, 226, 255, 201, 201, 201, 255,
  170, 170, 170, 255, 129, 129, 129, 255, 140, 140, 140, 255, 198, 198, 198, 255, 145, 145, 145,
  255, 138, 138, 138, 255, 116, 116, 116, 255, 184, 184, 184, 255, 212, 212, 212, 255, 202, 202,
  202, 255, 205, 205, 205, 255, 192, 192, 192, 255, 194, 194, 194, 255, 206, 206, 206, 255, 196,
  196, 196, 255, 208, 208, 208, 255, 203, 203, 203, 255, 229, 229, 229, 255, 215, 215, 215, 255,
  220, 220, 220, 255, 213, 213, 213, 255, 215, 215, 215, 255, 224, 224, 224, 255, 218, 218, 218,
  255, 228, 228, 228, 255, 224, 224, 224, 255, 218, 218, 218, 255, 222, 222, 222, 255, 225, 225,
  225, 255, 230, 230, 230, 255, 223, 223, 223, 255, 223, 223, 223, 255, 224, 224, 224, 255, 223,
  223, 223, 255, 230, 230, 230, 255, 225, 225, 225, 255, 226, 226, 226, 255, 231, 231, 231, 255,
  228, 228, 228, 255, 230, 230, 230, 255,
]);

export const inversionOutputArray = Uint8ClampedArray.from([
  28, 33, 37, 255, 27, 32, 36, 255, 25, 29, 32, 255, 22, 26, 29, 255, 22, 23, 27, 255, 21, 22, 26,
  255, 23, 23, 25, 255, 24, 24, 26, 255, 21, 19, 22, 255, 21, 19, 22, 255, 30, 35, 38, 255, 28, 33,
  36, 255, 25, 30, 33, 255, 24, 28, 29, 255, 24, 28, 29, 255, 25, 26, 28, 255, 23, 24, 26, 255, 22,
  22, 22, 255, 22, 22, 22, 255, 23, 21, 22, 255, 30, 39, 38, 255, 29, 35, 35, 255, 26, 32, 32, 255,
  25, 29, 28, 255, 25, 29, 28, 255, 26, 28, 27, 255, 22, 24, 23, 255, 19, 21, 18, 255, 21, 23, 20,
  255, 22, 22, 20, 255, 33, 41, 43, 255, 31, 39, 41, 255, 30, 36, 36, 255, 28, 34, 34, 255, 27, 31,
  30, 255, 25, 29, 28, 255, 25, 27, 26, 255, 23, 25, 24, 255, 23, 25, 22, 255, 23, 25, 22, 255, 39,
  44, 48, 255, 38, 43, 47, 255, 36, 41, 45, 255, 32, 37, 41, 255, 29, 33, 36, 255, 27, 31, 34, 255,
  29, 30, 32, 255, 30, 31, 33, 255, 23, 25, 24, 255, 23, 25, 24, 255, 37, 46, 51, 255, 37, 44, 50,
  255, 36, 43, 49, 255, 33, 40, 46, 255, 32, 37, 41, 255, 30, 35, 39, 255, 30, 34, 37, 255, 29, 33,
  36, 255, 21, 25, 26, 255, 21, 25, 26, 255, 40, 55, 60, 255, 38, 51, 57, 255, 37, 50, 56, 255, 40,
  51, 57, 255, 42, 51, 56, 255, 40, 49, 54, 255, 35, 43, 46, 255, 29, 37, 40, 255, 31, 36, 39, 255,
  31, 36, 39, 255, 48, 68, 77, 255, 44, 64, 73, 255, 43, 62, 69, 255, 48, 65, 73, 255, 53, 70, 77,
  255, 53, 68, 75, 255, 43, 56, 62, 255, 35, 46, 52, 255, 45, 56, 60, 255, 45, 56, 60, 255, 68, 97,
  111, 255, 100, 128, 142, 255, 68, 94, 107, 255, 110, 133, 147, 255, 85, 109, 121, 255, 98, 120,
  133, 255, 103, 123, 134, 255, 50, 68, 78, 255, 40, 59, 66, 255, 47, 64, 72, 255, 71, 104, 121,
  255, 133, 164, 182, 255, 110, 139, 155, 255, 89, 116, 133, 255, 113, 139, 156, 255, 144, 167, 183,
  255, 150, 172, 186, 255, 52, 71, 85, 255, 15, 34, 48, 255, 37, 55, 69, 255, 54, 85, 105, 255, 117,
  148, 168, 255, 95, 124, 142, 255, 21, 48, 67, 255, 86, 111, 131, 255, 129, 152, 170, 255, 159,
  180, 197, 255, 57, 76, 91, 255, 12, 29, 45, 255, 38, 54, 70, 255, 62, 90, 104, 255, 104, 130, 145,
  255, 95, 118, 132, 255, 38, 60, 74, 255, 92, 111, 126, 255, 100, 118, 132, 255, 124, 140, 153,
  255, 56, 72, 85, 255, 29, 43, 56, 255, 40, 52, 66, 255, 36, 55, 59, 255, 50, 68, 72, 255, 48, 66,
  70, 255, 37, 52, 57, 255, 49, 63, 66, 255, 38, 49, 53, 255, 45, 55, 57, 255, 19, 29, 31, 255, 34,
  42, 45, 255, 29, 37, 40, 255, 35, 47, 45, 255, 33, 43, 44, 255, 25, 35, 34, 255, 31, 40, 39, 255,
  23, 29, 29, 255, 28, 34, 32, 255, 35, 39, 38, 255, 31, 35, 34, 255, 29, 31, 30, 255, 24, 26, 25,
  255, 29, 35, 33, 255, 29, 33, 34, 255, 29, 33, 32, 255, 31, 33, 32, 255, 24, 26, 25, 255, 31, 31,
  29, 255, 30, 30, 28, 255, 25, 25, 23, 255, 28, 27, 25, 255, 26, 25, 23, 255,
]);

export const hueOutputArray = Uint8ClampedArray.from([
  226, 223, 217, 255, 229, 226, 220, 255, 230, 228, 224, 255, 233, 231, 226, 255, 231, 232, 227,
  255, 234, 235, 230, 255, 232, 233, 231, 255, 230, 231, 228, 255, 233, 236, 235, 255, 233, 236,
  235, 255, 226, 222, 218, 255, 226, 222, 218, 255, 231, 227, 223, 255, 232, 228, 227, 255, 232,
  228, 227, 255, 231, 231, 228, 255, 231, 231, 228, 255, 232, 232, 232, 255, 232, 232, 232, 255,
  231, 232, 233, 255, 224, 215, 215, 255, 225, 219, 219, 255, 230, 224, 224, 255, 229, 225, 225,
  255, 229, 225, 225, 255, 228, 226, 226, 255, 233, 231, 231, 255, 236, 233, 233, 255, 236, 233,
  233, 255, 236, 234, 234, 255, 222, 215, 212, 255, 224, 217, 214, 255, 225, 219, 219, 255, 227,
  221, 221, 255, 229, 225, 225, 255, 229, 225, 225, 255, 231, 228, 228, 255, 233, 231, 231, 255,
  234, 230, 230, 255, 234, 230, 230, 255, 216, 213, 207, 255, 216, 213, 207, 255, 219, 216, 210,
  255, 224, 221, 215, 255, 225, 223, 218, 255, 228, 225, 221, 255, 226, 226, 223, 255, 226, 226,
  223, 255, 233, 231, 231, 255, 233, 231, 231, 255, 219, 212, 205, 255, 218, 214, 205, 255, 218,
  214, 205, 255, 223, 219, 210, 255, 224, 221, 215, 255, 224, 221, 215, 255, 225, 223, 218, 255,
  225, 223, 218, 255, 235, 231, 230, 255, 235, 231, 230, 255, 214, 201, 194, 255, 216, 206, 197,
  255, 219, 209, 199, 255, 215, 207, 198, 255, 213, 207, 200, 255, 216, 210, 202, 255, 220, 213,
  209, 255, 225, 218, 214, 255, 223, 220, 215, 255, 223, 220, 215, 255, 206, 190, 177, 255, 211,
  195, 182, 255, 212, 196, 186, 255, 206, 193, 182, 255, 203, 190, 179, 255, 202, 191, 180, 255,
  211, 201, 192, 255, 220, 212, 203, 255, 209, 200, 194, 255, 209, 200, 194, 255, 187, 165, 144,
  255, 157, 135, 114, 255, 187, 168, 149, 255, 147, 130, 108, 255, 171, 153, 135, 255, 157, 142,
  123, 255, 153, 139, 122, 255, 205, 192, 177, 255, 214, 199, 189, 255, 209, 196, 184, 255, 183,
  159, 133, 255, 121, 99, 73, 255, 144, 124, 100, 255, 165, 146, 120, 255, 141, 124, 98, 255, 111,
  96, 73, 255, 105, 90, 68, 255, 203, 191, 170, 255, 241, 229, 208, 255, 218, 206, 185, 255, 201,
  180, 151, 255, 138, 117, 86, 255, 161, 141, 114, 255, 235, 217, 189, 255, 168, 153, 122, 255, 125,
  111, 84, 255, 96, 83, 57, 255, 198, 187, 164, 255, 243, 234, 210, 255, 218, 209, 185, 255, 192,
  171, 150, 255, 150, 132, 110, 255, 159, 143, 122, 255, 217, 202, 181, 255, 163, 151, 128, 255,
  156, 145, 124, 255, 131, 122, 103, 255, 198, 189, 169, 255, 225, 218, 198, 255, 214, 209, 189,
  255, 218, 201, 195, 255, 205, 189, 183, 255, 207, 191, 185, 255, 219, 207, 199, 255, 205, 192,
  188, 255, 216, 208, 202, 255, 210, 201, 198, 255, 236, 226, 223, 255, 222, 216, 211, 255, 225,
  218, 214, 255, 220, 208, 208, 255, 222, 213, 211, 255, 229, 220, 220, 255, 224, 215, 215, 255,
  233, 226, 226, 255, 227, 221, 221, 255, 219, 215, 215, 255, 224, 220, 220, 255, 225, 223, 223,
  255, 231, 228, 228, 255, 225, 219, 219, 255, 227, 223, 222, 255, 227, 222, 222, 255, 223, 221,
  221, 255, 231, 228, 228, 255, 225, 223, 223, 255, 228, 226, 226, 255, 233, 231, 231, 255, 231,
  228, 230, 255, 231, 228, 230, 255,
]);

export const saturationOutputArray = Uint8ClampedArray.from([
  229, 221, 215, 255, 231, 224, 218, 255, 232, 226, 222, 255, 235, 229, 224, 255, 233, 232, 226,
  255, 236, 234, 228, 255, 233, 233, 231, 255, 231, 231, 228, 255, 234, 237, 232, 255, 234, 237,
  232, 255, 228, 220, 216, 255, 228, 220, 216, 255, 233, 225, 221, 255, 233, 227, 226, 255, 233,
  227, 226, 255, 232, 230, 227, 255, 232, 230, 227, 255, 232, 232, 232, 255, 232, 232, 232, 255,
  231, 233, 232, 255, 226, 212, 214, 255, 226, 217, 217, 255, 232, 222, 222, 255, 230, 224, 225,
  255, 230, 224, 225, 255, 229, 225, 227, 255, 233, 231, 232, 255, 235, 232, 237, 255, 235, 232,
  237, 255, 233, 233, 236, 255, 224, 212, 209, 255, 227, 215, 212, 255, 226, 217, 217, 255, 229,
  220, 220, 255, 230, 224, 225, 255, 230, 224, 225, 255, 231, 228, 230, 255, 233, 231, 232, 255,
  233, 230, 234, 255, 233, 230, 234, 255, 218, 211, 205, 255, 218, 211, 205, 255, 221, 213, 207,
  255, 226, 219, 212, 255, 227, 221, 216, 255, 229, 224, 219, 255, 227, 225, 222, 255, 227, 225,
  222, 255, 233, 231, 232, 255, 233, 231, 232, 255, 222, 209, 201, 255, 221, 211, 202, 255, 221,
  211, 202, 255, 227, 216, 207, 255, 226, 219, 212, 255, 226, 219, 212, 255, 227, 221, 216, 255,
  227, 221, 216, 255, 236, 230, 228, 255, 236, 230, 228, 255, 219, 196, 189, 255, 221, 201, 192,
  255, 224, 204, 195, 255, 220, 203, 193, 255, 217, 204, 196, 255, 219, 206, 199, 255, 222, 211,
  206, 255, 227, 216, 211, 255, 225, 218, 213, 255, 225, 218, 213, 255, 213, 183, 169, 255, 218,
  188, 174, 255, 218, 190, 180, 255, 212, 187, 175, 255, 209, 184, 173, 255, 208, 185, 175, 255,
  216, 196, 187, 255, 225, 208, 199, 255, 213, 196, 190, 255, 213, 196, 190, 255, 198, 155, 134,
  255, 168, 124, 103, 255, 197, 159, 140, 255, 156, 121, 99, 255, 181, 144, 125, 255, 166, 134, 114,
  255, 161, 131, 115, 255, 212, 185, 170, 255, 221, 193, 182, 255, 215, 190, 178, 255, 196, 146,
  120, 255, 133, 87, 61, 255, 155, 113, 89, 255, 176, 135, 109, 255, 152, 113, 87, 255, 121, 87, 63,
  255, 114, 81, 59, 255, 211, 182, 161, 255, 249, 221, 200, 255, 226, 198, 177, 255, 214, 168, 138,
  255, 151, 104, 73, 255, 173, 129, 103, 255, 246, 206, 177, 255, 180, 142, 111, 255, 136, 101, 73,
  255, 105, 73, 48, 255, 207, 178, 156, 255, 252, 226, 202, 255, 226, 201, 177, 255, 202, 160, 139,
  255, 160, 122, 100, 255, 168, 134, 113, 255, 226, 193, 172, 255, 172, 142, 119, 255, 164, 137,
  116, 255, 138, 115, 96, 255, 205, 181, 162, 255, 232, 211, 191, 255, 221, 203, 182, 255, 224, 195,
  189, 255, 210, 183, 177, 255, 213, 186, 180, 255, 224, 202, 194, 255, 209, 188, 184, 255, 220,
  204, 198, 255, 213, 198, 195, 255, 239, 223, 220, 255, 225, 213, 209, 255, 227, 216, 211, 255,
  223, 205, 208, 255, 225, 210, 209, 255, 232, 217, 219, 255, 226, 212, 214, 255, 234, 225, 225,
  255, 229, 220, 223, 255, 220, 214, 215, 255, 225, 219, 220, 255, 226, 223, 224, 255, 231, 228,
  230, 255, 226, 217, 220, 255, 228, 222, 221, 255, 228, 221, 223, 255, 223, 220, 222, 255, 231,
  228, 230, 255, 223, 223, 226, 255, 225, 225, 229, 255, 231, 231, 233, 255, 227, 229, 232, 255,
  227, 229, 232, 255,
]);

export const luminosityOutputArray = Uint8ClampedArray.from([
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 250, 248, 247,
  255, 212, 200, 193, 255, 253, 252, 252, 255, 201, 189, 182, 255, 234, 228, 225, 255, 217, 209,
  204, 255, 213, 205, 200, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 242,
  236, 233, 255, 173, 138, 118, 255, 196, 180, 171, 255, 222, 212, 206, 255, 193, 177, 166, 255,
  162, 133, 113, 255, 156, 124, 104, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 188, 164, 148, 255, 216, 204, 197, 255, 255, 255, 255, 255, 226, 217,
  210, 255, 176, 154, 137, 255, 143, 112, 86, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 205, 193, 185, 255, 218, 209, 203, 255, 255, 255, 255, 255, 224,
  217, 212, 255, 217, 210, 204, 255, 185, 175, 166, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
]);