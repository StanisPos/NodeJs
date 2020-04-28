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

    async save() {
        const courses = await Course.getAll();
        courses.push(this.getCourse());

        await Course.writeToFile(courses);
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
}

module.exports = Course;
