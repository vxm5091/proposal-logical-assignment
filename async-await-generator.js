const a = () => new Promise( resolve => {
  setTimeout( () => resolve('result of a()'), 1000);
}); 

const b = () => new Promise( resolve => {
  setTimeout( () => resolve('result of b()'), 500);
});

const c = () => new Promise( resolve => {
  setTimeout( () => resolve('result of c()'), 1100);
});

// async generator function
const MyAsyncGenerator = async function*() {
  yield await a();
  yield await b();
  yield await c();
};

// generator object
const gen = MyAsyncGenerator();

// get 'gen' values
(async () => {
  console.log(await gen.next())
  console.log(await gen.next())
  console.log(await gen.next())
  console.log(await gen.next())
  // Promise.all([a(), b(), c()]).then(res => console.log(res))
})();

(async () => {
  await Promise.all([a(), b(), c()]).then(res => console.log(res))
})()


  
/**
 * There are 2 async operations happening, which is why we need to use await both in @MyAsyncGenerator and the anonymous @async function 
 * @MyAsyncGenerator has to @await for @setTimeout to return a Promise 
 * @next operations have to @await for the Promise to resolve 
 */





// Promise.all([a(), b(), c()]).then(values => console.log(values))