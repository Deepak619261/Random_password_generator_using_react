import { useState ,useCallback,useEffect,useRef} from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberallowed,setnumberallowed]=useState(false)
  const [charactersallowed,setcharactersallowed]=useState(false)

  const [Password,setPassword]=useState("")

  const passwordRef=useRef(null)

  const generatePassword=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberallowed) str+="0123456789"
    if(charactersallowed) str+="!@#$%^&*()_+"
    
    for (let i = 1; i <=length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }

    setPassword(pass)

  },[length,numberallowed,charactersallowed,setPassword])

  const copytoclipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(Password);
  },[Password])

  useEffect(() => {
    generatePassword()
  }, [length, numberallowed,charactersallowed])



  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder=""
            readOnly
            ref={passwordRef}
          />
          <button onClick={copytoclipboard} className=' cursor-pointer outline-none  bg-blue-600 text-white px-3 py-0.5 shrink-0.5'>COPY</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{
              setlength(e.target.value)
            }}
            />
            <label>Lenght :{length}</label>
          </div>

          <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberallowed}
          id="numberInput"
          onChange={() => {
              setnumberallowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charactersallowed}
              id="characterInput"
              onChange={() => {
                  setcharactersallowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
          
        </div>
      </div>
    </>
  )
}

export default App
