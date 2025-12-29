import Isi from "./components/isi";
import Content from './components/content';

export default function Quote() {
const fs = require('fs');
const path = require('path');

function dataJSON(){
  const dataPath = path.join(process.cwd(), 'src', 'app', 'editor-access', 'quotes.json');
  const dataJSON = fs.readFileSync(dataPath, 'utf8');
  return dataJSON;
}

const quoteRaw = JSON.parse(`${dataJSON()}`);
const banyakQuotes = quoteRaw[0].total;

const angka = Math.floor(Math.random() * banyakQuotes) + 1;
const quotes = quoteRaw[angka].quote;
const quoter = quoteRaw[angka].quoter;

  return (
    <>
    <Isi>
    <section className='wow text-center text-white'>
    <Content>
    <div className='space-y-3'>
      <p className="text-2xl font-bold">"{quotes}"</p>
      <p className="text-md">- {quoter}</p>
    </div>
    </Content>
    </section>
    </Isi>
    </>
  )
}