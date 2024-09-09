import React, {useState, forwardRef} from "react";

export const TitleInput = forwardRef(
    ({ title, setTitle, ...props }, ref) => {
    return (
        <div className="w-full">
            <label htmlFor="title" className="mb-1 inline-block">
                Title
                <sup>*</sup>
            </label>
            <input 
            type="text"
            ref={ref} //forward Ref to parent
            id="title"
            className="w-full border bg-transparent px-2 py-2 outline-none"
            {...props}
            />
        </div>  
    )
});

export const DescriptionInput = forwardRef(
    ({ description, setDescription, props }, ref) => {
    return (
        <div className="w-full">
            <label htmlFor="description" className="mb-1 inline-block">
                Description
                <sup>*</sup>
            </label>
            <textarea  
            id="description"
            className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
            {...props}
            ref={ref}
            ></textarea>
        </div>
    )
});