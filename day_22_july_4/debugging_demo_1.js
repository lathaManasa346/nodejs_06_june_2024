console.log('Global code starts')
function f3() {
    console.log('F3 starts')
    console.log('F3 Ends')
}
function f2() {
    console.log('F2 starts')
    f3()
    console.log('F2 Ends')
}
function f1() {
    console.log('F1 starts')
    f2()
    console.log('F1 Ends')
}
f1();
console.log('Global code Ends')