function main(n) {
  let val = 1
  let newN = 0
  const arr = []
  while(arr.length !== 10) {
      newN = val*n
      arr.push(newN)
      val+=2
  }
  console.log(arr)
}

main(3)