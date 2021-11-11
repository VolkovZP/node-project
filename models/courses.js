const { v4 } = require("uuid");
const fs = require('fs')
const path = require('path')
class Cours {
    constructor(title, price, img, description) {
        this.title = title,
            this.price = price,
            this.img = img
        this.description = description,
            this.id = v4();
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            description: this.description,
            id: this.id
        }
    }
    async save() {
        const courses = await Cours.getAll()
        courses.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((res, rej) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'), 'utf-8', (err, content) => {
                    if (err) {
                        rej(err)
                    } else {
                        res(JSON.parse(content))
                    }
                }
            )
        })
    }
    static async findById(id) {
        let courses = await Cours.getAll();
        return courses.find(c => c.id === id)

    }
}

module.exports = Cours;