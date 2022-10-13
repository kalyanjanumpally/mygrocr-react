import React from "react";
import Link from "next/link";

const BlogList = ({ show }) => {
    var data = [
        {
            id: 15,
            title: "The litigants on the screen are not actors",
            category: "Politic",
            views: 126,
            date: "25 April 2021",
            img: "blog-1.jpg",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 14,
            title: "Essential Qualities of Highly Successful Music",
            img: "blog-2.png",
            category: "Global",
            views: 126,
            date: "25 April 2021",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 13,
            title: "Essential Qualities of Highly Successful Music",
            img: "blog-3.png",
            category: "Global",
            views: 126,
            date: "25 April 2021",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 12,
            title: "Essential Qualities of Highly Successful Music",
            img: "blog-4.png",
            category: "Global",
            views: 126,
            date: "25 April 2021",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 11,
            title: "Essential Qualities of Highly Successful Music",
            img: "blog-5.png",
            category: "Global",
            views: 126,
            date: "25 April 2021",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 10,
            title: "Essential Qualities of Highly Successful Music",
            img: "blog-6.png",
            category: "Global",
            views: 126,
            date: "25 April 2021",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 9,
            title: "Which are the Healthiest Oils for Cooking?",
            img: "organic-cold-pressed-wood-pressed-oils.jpg",
            category: "Global",
            views: 126,
            date: "25 April 2021",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 8,
            title: "Should we Eat Millets?",
            img: "millets-our-superfoods.jpg",
            category: "Global",
            views: 126,
            date: "25 April 2021",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 7,
            title: "Yoga and Weight Loss",
            img: "yoga-weight-loss.jpg",
            category: "Global",
            views: 126,
            date: "25 April 2021",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 6,
            title: "Which Rice is the Healthiest to Eat?",
            img: "healthiest-rice.jpg",
            category: "Global",
            views: 126,
            date: "25 April 2021",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 5,
            title: "How much sugar is good for health?",
            img: "organic-brown-sugar-benefits.jpg",
            category: "Global",
            views: 126,
            date: "25 April 2021",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 4,
            title: "Is Ghee Good for Health?",
            img: "desi-gir-cow-ghee.jpg",
            category: "Global",
            views: 126,
            date: "25 April 2021",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 3,
            title: "Found a Bug? Be Happy!",
            img: "natural-farming.jpg",
            category: "Global",
            views: 126,
            date: "25 April 2021",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 2,
            title: "Ojasvita- A Delicious Health Drink!",
            img: "ojasvita.jpg",
            category: "Global",
            views: 126,
            date: "25 April 2021",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        {
            id: 1,
            title: "Essential Changes for Healthy Life",
            img: "essential-changes-for-healthy-life",
            category: "Global",
            views: 126,
            date: "1 June 2017",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
    ];

    return (
        <>
            {data.slice(0, show).map((item, i) => (
                <article className="wow fadeIn animated hover-up mb-30">
                    <div
                        className="post-thumb"
                        style={{
                            backgroundImage: `url(/assets/imgs/blog/${item.img})`,
                        }}
                    >
                        <div className="entry-meta">
                            <Link href="#">
                                <a className="entry-meta meta-2">SWAP4PURE</a>
                            </Link>
                        </div>
                    </div>
                    <div className="entry-content-2">
                        <h3 className="post-title mb-15">
                            <Link href="/blog-post-right">
                                <a>
								{item.title}
                                </a>
                            </Link>
                        </h3>
                        <p className="post-exerpt mb-30">
								{item.desc}
                        </p>
                        <div className="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                            <div>
                                <span className="post-on">
                                    {" "}
                                    <i className="fi-rs-clock"></i> {item.date}
                                </span>
                                {/* <span className="hit-count has-dot">
                                    126k Views
								</span> */}
                            </div>
                            <Link href="/blog-post-right">
                                <a className="text-brand">
                                    Read more{" "}
                                    <i className="fi-rs-arrow-right"></i>
                                </a>
                            </Link>
                        </div>
                    </div>
                </article>
            ))}
        </>
    );
};

export default BlogList;
