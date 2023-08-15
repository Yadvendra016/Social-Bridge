import bcrypt from 'bcrypt';

// function to hashed password

export const hashPassword = (password) =>{
    return new Promise((resolve, reject) =>{
        bcrypt.genSalt(12, (err,salt) =>{
            if(err) reject(err);

            bcrypt.hash(password, salt, (err,hash) =>{
                if(err) reject(err);

                resolve(hash);
            });
        });
    });
};

// compare hash value and enterd password
export const comparePassword = async (password, hashed) =>{
    return await bcrypt.compare(password, hashed);
}