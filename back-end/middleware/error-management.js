exports.error = (message) => {
    return {
        status: "error",
        message: message,
    };
};

exports.success = (result) => {
    return {
        status: "success",
        result: result
    };
};