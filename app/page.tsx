import {main} from '../prisma/user'

const user = await main( 
  "zdfjhbdskj", "sdfds","sdfs","sqdsd"
)
console.log("🚀 ~ user:", user)

export default function Home() {
  return (
   <div>
   </div>
  );
}
