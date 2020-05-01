const fs = require('fs');
const path = require('path');
const {v4: uniqueId} = require('uuid');

class Course {
    constructor({title, price, img}) {
        this.title = title;
        this. price = price;
        this.img = img;
        this.id = uniqueId();
    }

    getCourse() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    static async update(course) {
        const courses = await Course.getAll();
        const index = courses.findIndex(el => el.id === course.id);
        courses[index] = course;

        Course.writeToFile(courses);
    }

    async save() {
        const courses = await Course.getAll();
        courses.push(this.getCourse());

        Course.writeToFile(courses);
    }

    static coursesPath = path.join(__dirname, '..', 'data', 'courses.json');

    static writeToFile(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(
                Course.coursesPath,
                JSON.stringify(data),
                (err) => {
                    if (err) {
                        reject(err);
                    }

                    resolve();
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                Course.coursesPath,
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(JSON.parse(content));
                }
            )
        })
    }

    static async getById(id) {
        const courses = await Course.getAll();
        return courses.find(c => c.id === id);
    }

}

module.exports = Course;
