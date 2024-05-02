import Tree from "./index.js";
const arr = () => {
  return Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
};
console.log(arr());

const tree1 = new Tree(arr());
tree1.prettyPrint(tree1.root);

console.log(tree1.isBalanced(tree1.root));
console.log(tree1.preOrder());
console.log(tree1.inOrder());
console.log(tree1.postOrder());
const newArr=arr()
while(newArr.length>0){
tree1.insert(newArr.pop())
}
tree1.prettyPrint(tree1.root);
tree1.rebalance()
tree1.prettyPrint();
console.log(tree1.isBalanced(tree1.root));
console.log(tree1.preOrder());
console.log(tree1.inOrder());
console.log(tree1.postOrder());


