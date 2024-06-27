

const enumOk = (gender) => {
    const enumGender = ["Hombre", "Mujer", "Otro"];
    if (enumGender.includes(gender)) {
        return { check: true, gender};
    } else {
        return { check: false};
    }
};

module.exports = enumOk;