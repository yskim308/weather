// importing images from img/ directory 
const images = {}
const requireContext = require.context('./img', false, /\.png$/);
requireContext.keys().forEach((filePath)=>{
    // make key for images the name of file without .png 
    const fileName = filePath.replace('./', '').replace('.png', '');
    images[fileName] = requireContext(filePath);
})

