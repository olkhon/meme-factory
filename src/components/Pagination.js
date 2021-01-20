import React from 'react'

export default function Pagination ({allImages})  {


    return (
        <ul className="list-group mb-4">
                {allImages.map((img) => {
                    return (
                        <li key={img.id} className="list-group-item">
                        <img src={img.url} />
                    </li>
                    )

                })}
        </ul>
    )
}
