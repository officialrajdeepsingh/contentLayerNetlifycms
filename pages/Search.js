import Post from '../components/Post'
import Banner from "../components/Banner";
// import search from "../search.json";
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import { ImageUrl } from '../utils'
import { allPosts } from "contentlayer/generated";


export default function Search() {
    const { query } = useRouter()
    const TempPosts = []    

    allPosts.map(
        (post) => {
            if (post.draft === false) {
                if (post.title.toLowerCase().includes(query.q) || post.summary.toLowerCase().includes(query.q) || post.description.toLowerCase().includes(query.q)) {
                    TempPosts.push(post)
                } else {
                    TempPosts.push(null)
                }
            }
        }
    )

    //   remove null in posts 
    const posts = TempPosts.filter(
        path => {
            return path && path
        }
    )

    return (
        <div>
            <NextSeo
                title="Search the page"
                description="Find the search result page"
                openGraph={{
                    url: 'http://officialrajdeepsingh.dev',
                    title: 'Search the page',
                    description: 'Find the search result page',
                    images: [
                        {
                            url: `${ImageUrl('banner.png')}`,
                            width: 1224,
                            height: 724,
                            alt: 'banner',
                            type: 'image/jpeg',
                        },
                    ],
                    site_name: 'Rajdeep Singh',
                }}
            />
            <Banner />
            <div className="container">
                <div className="row">

                    <div className="col-lg-8 m-auto">

                        {
                            posts.length > 0 ?
                                posts.map((post, index) => (
                                    <Post key={index} post={post} />
                                )) : <div className='m-auto p-5 mx-5 '>
                                    <h2 className='text-center'>
                                        {query.q ? `No post find base on ${query.q} ` : 'loadding.. '}
                                    </h2>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
