import React, {useState, useRef, Suspense} from 'react';
import emailjs from '@emailjs/browser';
import { Canvas, extend } from '@react-three/fiber'
import useAlert from "../hooks/useAlert";
import Fox from "../models/Fox"
import Loader from "../components/Loader"
import Alert from '../components/Alert';

const Contact = () => {
  const formRef = useRef(null);

  const [form, setform] = useState({name: '', email: '', message: ''});
  const [isLoading, setisLoading] = useState(false);
  const [currentAnimation, SetCurrentAnimation] = useState('idle');
  
  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setform({...form, [e.target.name]: e.target.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    SetCurrentAnimation('hit');
    // console.log(`Sending email
    //   service id: {${import.meta.env.VITE_APP_EMAILJS_SERVICE_ID}},
    //   template id: {${import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID}}
    //   public key: {${import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY}}`)
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Adam",
        from_email: form.email,
        to_email: "thetoastacademy@gmail.com",
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setisLoading(false);
      showAlert({text:"Message sent successfully!", type: "success"});
      // TODO: Hide Alert
      setTimeout(() => {
        SetCurrentAnimation('idle');
        setform({name: '', email: '', message: ''});
        hideAlert();
      }, [3000])
    }).catch((error) => {
      console.log(error);
      setisLoading(false);
      SetCurrentAnimation('idle');
      setform({name: '', email: '', message: ''});
      showAlert({text:"Send message was unsuccessful!"});
    })
  };

  const handleFocus = () => SetCurrentAnimation('walk');
  const handleBlur = () => {}; //SetCurrentAnimation('idle');
  return (
    <section className='relative flex lg:flex-row flex-col max-container' ref={formRef}>
      {alert.show && <Alert {...alert} />}
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>
          Get in Touch
        </h1>

        <form
          className='w-full flex flex-col gap-7 mt-14'
          onSubmit={handleSubmit}
          >
            <label className='text-black-500 font-semibold'>
              Name
              <input
                type="text"
                name='name'
                className='input'
                placeholder='John'
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                >

                </input>
            </label>

            <label className='text-black-500 font-semibold'>
              Email
              <input
                type="email"
                name='email'
                className='input'
                placeholder='johndoe@gmail.com'
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                >

                </input>
            </label>

            <label className='text-black-500 font-semibold'>
              Your Message
              <textarea
                name='message'
                rows={4}
                className='textarea'
                placeholder='Fruit for thoughts?'
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <button
              type='submit'
              className='btn'
              disabled={isLoading}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
      </div>
      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera = {{
            position: [0,0,5],
            fov: 75,
            near: 0.1,
            far: 1000
          }}>

            <directionalLight intensity={2.5} position={[0,0,1]} />
            <ambientLight intensity={0.5}></ambientLight>
            <Suspense fallback={<Loader />}>
              <Fox
                currentAnimation={currentAnimation}
                position={[0.5, 0.35, 0]}
                rotation={[12.6, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact