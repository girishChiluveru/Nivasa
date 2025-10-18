// /*Write a query to display the first 3 students sorted by totalMarks descending.
// Database: students
// Collection: students
// sample output=               
//   [
//   {
//     studentRollNumber: 110,
//     name:'Divya Menon',
//     totalMarks: 461
//   },
//   {
//     studentRollNumber: 104,
//     name:'Meena Gupta',
//     totalMarks: 458
//   },
//   {
//     studentRollNumber: 108,
//     name:'Pooja Nair',
//     totalMarks: 450
//   }
// ]
// db.students.find().sort({marks:-1}).limit(3)


// */
// /*Write a query to count the number of students having totalMarks less than 400.
// Database: students
// Collection: students

// sample output=               

// 6
// db.students.find({marks:{$lt:400}}).count()
// */
// /*Write a query to find the maximum marks scored in each department.
// Database: students
// Collection: students

// sample output=               

//  [
//   {
//     _id: 'MECH',
//     maxMarks: 344
//   },
//   {
//     _id: 'ECE',
//     maxMarks: 461
//   },
//   {
//     _id: 'CSE',
//     maxMarks: 458
//   },
//   {
//     _id: 'IT',
//     maxMarks: 450
//   }
// ]

// */
// /*Write a query to calculate the minimum marks scored in the class.
// Database: students
// Collection: students

// sample output=               
// sample output=               
 
// [                                                                                                                                                     
//   {                                                                                                                                                   
//     _id: null,                                                                                                                                        
//     minMarks: 335                                                                                                                                     
//   }                                                                                                                                                   
// ] 
// db.students.find().sort({marks:1}).limit(1)
// */
// /*
// Create a Node.js program that first creates a text file named note.txt with the 
// content "Learning Node.js File System". Then copy its contents to a new file
// named note_copy.txt using streams. Handle any errors and display appropriate messages.

// case=1
// input=
// output=Source file created successfully.
// File copied successfully.


// */
// /*Create an EventEmitter that emits a 'login' event and prints the username of 
// the logged-in user. 
// sample output:
// User logged in: JohnDoe
// */
// /* Write a Node.js program to read data from "data.json" and display it in the 
// console.

// If the file does not exist, create it with sample data.

// sample output:
// Data: { name: 'Alice', age: 25, city: 'Hyderabad' }
// */
// /* Write a Node.js program to append "Node.js is powerful!" to the file note.txt.

// sample output:
// Text appended successfully!
// */
// /*  Write a program that prints “Finished!” after a delay of 5 seconds 

// using setTimeout().
// setTimeout(()=>{
//     console.log("Finished")
// },5000)

// sample output: 
// Finished!
// */
// /*Write a Node.js program to create a new text file note.txt and write
// "Learning Node.js File System" into it..

// sample output: 
// File note.txt created and content written successfully!  
// */
// Naresh loves building secret “word machines.” 
// He writes compact expressions like [ab,cd]x[y,z] and challenges his friends to 
// expand them into every possible word the machine can make. 
// Each pair of square brackets means “pick one option,”
// and when you place parts next to each other, you glue them together. 
// Sometimes Naresh even nests choices inside choices — 
// like [[a,b],[b,c]] — and expects a clean, sorted list of all unique resulting words. 
// Your job: read Naresh’s expression and print all distinct words it can produce, in lexicographical order.

// You are given a string expression EXP that encodes a set of words using concatenation and choices:
//     * A literal is one or more lowercase letters [a–z].
//     * A group is written as [ alt1,alt2,… ] and means “choose exactly one alternative.”
//     * Each alternative 'alti' is itself a full expression (so groups can be nested).
//     * The overall expression is the concatenation of consecutive literals and/or groups.
//     * Optional whitespace may appear anywhere and should be ignored.

// Generate all distinct strings represented by EXP and print them in lexicographical order.


// Input Format:
// -------------
// Line-1: A string EXP, expression.

// Output Format:
// --------------
// Line-1: A list of the generated strings in lexicographical order, formed from the expression.

// Sample Input-1:
// ---------------
// [b]c[e,g]k

// Sample Output-1:
// ----------------
// [bcek, bcgk]


// Sample Input-2:
// ---------------
// [a,b][c,d]

// Sample Output-2:
// ----------------
// [ac, ad, bc, bd]

// Sample Input-3:
// ---------------
// [xyz]a[b,c]

// Sample Output-3:
// ----------------
// [xyzab, xyzac]

// Sample Input-4:
// ---------------
// [[a,b],[b,c]]

// Sample Output-4:
// ----------------
// [a, b, c]





// The Kolar Gold Fields (KGF) is in the form of a m*n grid,
// Each field, contains some amount of Gold in it.
 
// You can mine the gold in the KGF in the following way.
// 	- You can start at any position in the grid, never visit a cell with no gold.
// 	- each time you visit a cell, you will grab all the gold in it.
// 	- You can move one step to the left, right, up or down.
// 	- You can't visit the same cell more than once.
// 	- You can stop at any cell.
	
// Your task is to find the maximum amount of gold you can collect.

// Input Format:
// -------------
// Line-1: Two integers M and N size of the KGF grid.
// Next M lines: N space separated integers, gold in each row of the grid.

// Output Format:
// --------------
// Print an integer, maximum amount of gold.


// Sample Input-1:
// ---------------
// 3 3
// 3 6 0
// 5 8 7
// 0 9 0

// Sample Output-1:
// ----------------
// 24

// Explanation:
// -------------
// You can grab the gold in KGF grid as follows:
// You can obtain like as follows: 9 -> 8 -> 7.

// Sample Input-2:
// ---------------
// 5 3
// 1 0 7
// 2 0 6
// 3 4 5
// 0 3 0
// 9 0 20

// Sample Output-2:
// ----------------
// 28

// Explanation:
// -------------
// You can grab the gold in KGF grid as follows:
// You can obtain like as follows: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7


// const objs=[
//     {name:"apple",price:200},
//     {name:"cat",price:500},
//     {name:"elephant",price:750},
//     {name:"dog",price:40},
//      {name:"ball",price:50},
// ]
// const names=objs.sort((a,b)=>(a.name.localeCompare(b.name)))
// console.log(names)
// objs.sort((a,b)=>(a.price-b.price))
// console.log(objs)

// const mongoose=require('mongoose')
// async function main(){
//     await mongoose.connect("mongodb://localhost:27017/students")
// }
// main()
// const model=new mongoose.Schema({
//     rollno:Number,
//     name:String,
//     marks:Number,
// })
// const student=mongoose.model("students",model)
// student.insertMany(  [
//  {
//     rollno:987,
//     name:'aisha zeneth',
//     marks:6969
//  },
//   {
//     rollno: 104,
//     name:'Meena Gupta',
//     marks: 458
//   },
//   {
//     rollno: 108,
//     name:'Pooja Nair',
//     marks: 450
//   }
// ]
// )
// student.find