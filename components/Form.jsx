import React from 'react';
import texts from '../public/data/texts.json';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-lg flex-start flex-col">
        <h1 className="head_text text-center">
          <span className="orange_gradient">{texts.newGame}</span>
        </h1>
        <p className="desc text-center">{texts.gameDescription}</p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 w-full flex flex-col gap-3 glassmorphism ustify-center items-center">
            <label>
              <span className="font-satoshi text-2xl text-slate-300">{texts.chooseUsername}</span>
            </label>
            <input 
                className="p-3 m-3 h-8 rounded-md" 
                type="text" 
                value={post.name} 
                required 
                onChange={(e) => setPost({ name: e.target.value })} />
            <div className="flex-end mx-3 mb-5 gap-4">
              <button type="submit" className="px-14 py-2 text-xl bg-amber-600 rounded-full text-slate-100">
                {texts.play}
              </button>
            </div>
        </form>
    </section>
  )
}

export default Form
