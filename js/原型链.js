function People(){
    this.name = 'xiaohuang';
    this.sex = 'man';    
}
People.prototype = {
    getName: function() {
        // return this.name;
        console.log(this.name);
    },
    changeSex:function() {
        var sex = this.sex;
        if(sex === 'man'){
            this.sex = 'women';
        }
        else if(sex === 'women'){
            this.sex = 'man';
        }
        else {
            this.sex = 'I\'m sorry';
        }
        console.log(this.sex);
    }
};
People.prototype.addAge = function() {
	this.age = '18';
};
People.getName = function() {
    alert(this.name);
};
var lip = new People();


function Student(grade) {
    this.grade = grade;
}
Student.prototype = new People();
var tom = new Student(9);
console.log(tom);


function Pupils(course) {
    this.course = course;
}
Pupils.prototype = new Student();
var alice = new Pupils();
console.log(alice.sex);
