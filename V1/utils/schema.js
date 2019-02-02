function schema(args,obj){

    //Checks if the property is defined
    for( arg in args){
        
        if(!obj[arg]){
            return {
                passed: false,
                message: "The "+ arg +" is undefined "
            };
        }

    }

    for( arg in args){

        //When the type is an array
        if(args[arg] == 'array'){
            if(obj[arg] instanceof Array){
                continue;
            }else{
                return {
                    passed: false,
                    message: arg +" should be an Array "
                };
            }
        }

        //When the type is a date
        if(args[arg] == 'date'){
            if(obj[arg] instanceof Date){
                continue;
            }else{
                return {
                    passed: false,
                    message: arg +" should be a valid Date "
                };
            }
        }

        //When the type is an email
        if(args[arg] == "email"){
            if(!RegExp(/^[a-zA-Z-._]+@[a-zA-Z-._]+.[a-zA-Z]{2,4}$/).test(obj[arg].toString().toLowerCase())){
                return {
                    passed: false,
                    message: arg +" should be a valid email adress "
                };
            }else{
                continue;
            }
        }

        //When the schema requires an integer
        if(args[arg] == 'integer'){
            if(!Number.isInteger(obj[arg])){ console.log(typeof obj[arg]);
                return {
                    passed: false,
                    message: arg +" should be an integer "
                };
            }else{
                continue;
            }
        }

        //Checks the type
        if(typeof obj[arg] != args[arg]){
            return {
                passed: false,
                message: arg +" should be "+args[arg]
            };
        }

    }

    return {
        passed: true,
        obj: obj
    };

}

module.exports = schema;

