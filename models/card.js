const fs = require('fs');
const path = require('path');

class Card {
    static cardPath = path.join(
        path.dirname(process.mainModule.filename),
        'data',
        'card.json'
    );

    static _updateCardByDeleting(card, id) {
        const index = card.courses.findIndex((c) => c.id === id);
        const course = card.courses[index];

        if (course.count === 1) {
            card.courses.splice(index, 1);
        } else {
            card.courses[index].count--;
        }

        card.price -= parseInt(course.price, 10);

        return card;
    }

    static _updateCardByAdding(card, course) {
        const index = card.courses.findIndex((c) => c.id === course.id);
        const candidate = card.courses[index];

        if (candidate) {
            candidate.count++;
            card.courses[index] = candidate;
        } else {
            course.count = 1;
            card.courses.push(course);
        }

        card.price += parseInt(course.price, 10);

        return card;
    }

    static async add(course) {
        const card = await Card.getAll();
        const preparedCard = this._updateCardByAdding(card, course);

        await this.write(preparedCard);
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.cardPath, 'utf-8', (err, content) => {
                if (err) {
                    reject(err);
                }

                resolve(JSON.parse(content));
            })
        })
    }

    static write(card) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.cardPath, JSON.stringify(card), (err) => {
                if (err) {
                    reject(err);
                }

                resolve(card);
            });
        });
    }

    static async remove(id) {
        const card = await this.getAll();
        const updatedCard = this._updateCardByDeleting(card, id);

        await this.write(updatedCard);

        return updatedCard;
    }
}

module.exports = Card;
