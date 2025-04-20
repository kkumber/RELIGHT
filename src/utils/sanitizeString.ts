const sanitizeString = (data: string) => {
    const sanitizedValue = data.replace(/[^a-zA-Z0-9:,\.\-\s]/g, " ");
    const cleanedValue = sanitizedValue.replace(/\s+/g, " ").trim();
    return cleanedValue;
}

export default sanitizeString;