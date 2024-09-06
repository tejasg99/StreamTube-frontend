export default function formatBytes(bytes, decimals=2) {
    if(bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals; //To ensure that number of decimal places is not negative
    
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"] 

    const i = Math.floor(Math.log(bytes) / Math.log(k)) //Calculation of appropriate unit

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + "" + sizes[i]; //Proper formatting the size
}