app.service("shareProduct",  function () {
    var objectValue = { };

    return {
        getObject: function () {
            return objectValue;
        },
        setObject: function(value) {
            objectValue = value;
        }
    };
});