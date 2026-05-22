// =========================
// Завдання 1
// =========================

class PrintMachine {

    constructor(fontSize, color, fontFamily) {
        this.fontSize = fontSize;
        this.color = color;
        this.fontFamily = fontFamily;
    }

    print(text) {
        document.write(`
            <p style="
                font-size:${this.fontSize}px;
                color:${this.color};
                font-family:${this.fontFamily};
            ">
                ${text}
            </p>
        `);
    }
}

let printer = new PrintMachine(28, "blue", "Arial");

printer.print("Привіт! Це робота класу PrintMachine.");



// =========================
// Завдання 2
// =========================

class News {

    constructor(title, text, tags, date) {
        this.title = title;
        this.text = text;
        this.tags = tags;
        this.date = new Date(date);
    }

    getDateString() {

        let now = new Date();

        let diff = Math.floor((now - this.date) / (1000 * 60 * 60 * 24));

        if (diff < 1) {
            return "сьогодні";
        }
        else if (diff < 7) {
            return `${diff} днів тому`;
        }
        else {
            return this.date.toLocaleDateString("uk-UA");
        }
    }

    print() {

        document.write(`
            <div class="news">
                <h2>${this.title}</h2>

                <div class="date">
                    ${this.getDateString()}
                </div>

                <p>${this.text}</p>

                <div class="tags">
                    #${this.tags.join(" #")}
                </div>
            </div>
        `);
    }
}


let news1 = new News(
    "Вийшов новий JavaScript",
    "JavaScript продовжує розвиватися.",
    ["javascript", "web", "frontend"],
    "2026-05-21"
);

let news2 = new News(
    "Новий ноутбук",
    "Компанія представила новий потужний ноутбук.",
    ["tech", "laptop"],
    "2026-05-15"
);

news1.print();
news2.print();



// =========================
// Завдання 3
// =========================

class NewsFeed {

    constructor() {
        this.newsList = [];
    }

    get count() {
        return this.newsList.length;
    }

    addNews(news) {
        this.newsList.push(news);
    }

    deleteNews(title) {
        this.newsList = this.newsList.filter(
            news => news.title !== title
        );
    }

    sortByDate() {

        this.newsList.sort(
            (a, b) => b.date - a.date
        );
    }

    findByTag(tag) {

        return this.newsList.filter(
            news => news.tags.includes(tag)
        );
    }

    printAll() {

        this.newsList.forEach(
            news => news.print()
        );
    }
}


let feed = new NewsFeed();

feed.addNews(news1);
feed.addNews(news2);

document.write("<h2>Усі новини:</h2>");

feed.sortByDate();
feed.printAll();

document.write(`<h3>Кількість новин: ${feed.count}</h3>`);


let foundNews = feed.findByTag("javascript");

document.write("<h2>Пошук за тегом 'javascript'</h2>");

foundNews.forEach(
    news => news.print()
);


feed.deleteNews("Новий ноутбук");

document.write("<h2>Після видалення новини:</h2>");

feed.printAll();