Immutable Means unable to change or we can't change the value of it.

Numbers are immutable
=====================
```
1,2,3, ..... are immutable even though we do some operations with it the value of numbers wont change

Ex: Let's sum the 3 and 5 
3+5=8;
then the value of 3 remains 3 and value of 5 remains 5
```
Strings are immutable
=====================
```
//We cannot append to the strings and delete from the 
"Ramesh","Suresh","Venkatesh" are immutable

string s="Venkatesh";

string resultString=s.split('k')[0];

o/p:
resultString="Ven";
s="Venkatesh";
```

StringBuilders are mutable
==========================
```
StringBuilder givenString="Venkatesh";

StringBuilder resultString=givenString.append(" Chunchu");

o/p:
givenString="Venkatesh Chunchu";
resultString="Venkatesh Chunchu";
```

Arrays are mutable
==================
```
Array a= [];
Array b= a.push(1);

o/p:
a.length=1;
b.length=1;
```
ImmutableArrays:
===============
```
var arr = new ImmutableArray([1, 2, 3, 4]);
var v2 = arr.push(5);

// using concat Idom it will create new array
var bArray = [1,2,3];
var v3 = [].concat(bArray);
v3[1] = 7;

arr.toArray(); // [1, 2, 3, 4]
v2.toArray();  // [1, 2, 3, 4, 5]
bArray.toArray(); // [1,2,3]
v3.toArray(); // [1, 7, 3]
```
ImmutableMap:
============ 
```
var person = new ImmutableMap({name: "Chris", age: 32});
var olderPerson = person.set("age", 33);

person.toObject(); // {name: "Chris", age: 32}
olderPerson.toObject(); // {name: "Chris", age: 33}
```
“set” properties that don’t actually set anything, but return a new object with the desired changes:
