import Hello from "@/components/hello";

const Home = () => {
  console.log('Server');
  return (
    <main>
        <div>Welcome to the website!</div>
        <Hello />
    </main>
  )
}

export default Home