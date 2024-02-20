function main(n) {
  const arr = []
  for(let newN = n; arr.length !== n; newN--) {
    arr.push(newN)
  }
  console.log(arr)
}

main(10)