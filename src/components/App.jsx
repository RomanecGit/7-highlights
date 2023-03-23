import React, {useState} from 'react';

function New(props) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

function Article(props) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

function Video(props) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};

// оборачивает компонент в Popuar или New  в зависимости от количества просмотров (либо выводит как есть)
function SmartView(Component) {
    return function (props, ...args) {
        const Comp = Component.apply(undefined, [{...props}, ...args]);
        //в зависимости от views выводим Component как children в Popular или New либо возвращаем как есть
        if (props.views >= 1000) // что-то популярное
            return (<Popular>{Comp}</Popular>);
        else if (props.views < 100) //что-то новое
            return (<New>{Comp}</New>);
        else                        //что-то не новое уже, но еще не популярное
            return (Comp);
    }
}

//оборачиваем видео и статьи в украшалку
const SmartVideo = SmartView(Video);
const SmartArticle = SmartView(Article);

function List(props) {
    return props.list.map((item, i) => {
        switch (item.type) {
            case 'video':
                return (
                    //<Video {...item} />
                    <SmartVideo key={i} {...item}/>
                );
            case 'article':
                return (
                    //<Article {...item} />
                    <SmartArticle key={i} {...item} />
                );
        }
    });
};

export default function App() {
    const [list, setList] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list}/>
    );
}