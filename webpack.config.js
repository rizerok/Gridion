const merge = require('webpack-merge');

const configCommon = require('./webpack/webpack.common');

let sameRule = function(a,b){
    if(String(a.test)!==String(b.test)){//check test
        return false;
    }

    let use1, use2;
    Array.isArray(a.use) ? use1 = a.use : use1 = [a.use];
    Array.isArray(b.use) ? use2 = b.use : use2 = [b.use];
    if(use1.length!==use2.length){//check loaders count
        return false;
    }

    for(let i = 0;i<use1.length;i++){//check by loaders
        if(use1[i].loader !== use2[i].loader){
            return false;
        }
    }

    return true;
};

let configComplete = function (env) {
    const config = require(`./webpack/webpack.${env}.js`);
    let complete =  merge(
        {
            customizeArray(a, b, key) {
                if(key === 'module.rules'){
                    let rules = b;
                    a.forEach(elA=>{
                        if(rules.every(r=>!sameRule(r,elA))){//uniq
                            rules.push(elA);
                        }
                    });
                    return rules;
                }
                if(key === 'plugins'){
                    if(
                        a.find(elA=>elA.constructor.name==='ExtractTextPlugin') &&
                        b.find(elB=>elB.constructor.name==='ExtractTextPlugin')
                    ){
                        let etp = a.find(elA=>elA.constructor.name==='ExtractTextPlugin');
                        let idx = a.indexOf(etp);
                        a.splice(idx,1);
                    }
                }
                // Fall back to default merging
                return undefined;
            },
            customizeObject(a, b, key) {
                if (key === 'entry') {
                    return b;
                }
                // Fall back to default merging
                return undefined;
            }
        }
    )(configCommon,config);
    //console.log(complete);
    return complete;
};

module.exports = configComplete;