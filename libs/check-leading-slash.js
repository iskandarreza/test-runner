const appRoot = require("app-root-path")

/**
 * If the first character of the file path is not a forward slash, then prepend the file path with a
 * forward slash.
 * @param {string} FILE_PATH - The path to the file you want to read.
 * @returns {string} the value of the function call.
 */
 const checkLeadingSlash = (FILE_PATH) => {
    if (Array.from(FILE_PATH)[0] !== '/') {
        console.warn(`WARNING: Missing leading slash in code absolute path, pre-pending '/'`)
        console.info('')
        return `${appRoot + '/' + FILE_PATH}`
    }
}

exports.checkLeadingSlash = checkLeadingSlash