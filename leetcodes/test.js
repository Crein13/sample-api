function main(n) {
    let val = 0
    let a = 0
    const last = 10
    while(a !== last) {
        a+=1
        val = a*n
        console.log(val)
    }
    return val
};

main(5)