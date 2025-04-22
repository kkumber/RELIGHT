const specialCharsTest = (data: string) => {
    const regex = /[^:,\.\-\d]/g;
    return regex.test(data);
};

export default specialCharsTest;