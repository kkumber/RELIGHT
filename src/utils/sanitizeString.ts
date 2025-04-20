const sanitizeString = (data: string) => {
    const sanitizedValue = data.replace(/[^a-zA-Z0-9:,\.\- ]/g, ' ');
    return sanitizedValue;
}

export default sanitizeString;