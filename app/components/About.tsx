export const About = () => {
    return (
        <div className="mt-12 mb-6">
            <section id="about">
                <div className="mb-8">
                    <h1 className="mt-12 mb-6 text-2xl font-semibold tracking-tighter">Hi, I'm Dom👋</h1>
                    <p className="mb-16">I'm a sophomore studying Computer Science at Boston College focused on AI product engineering and development. I'm passionate about building innovative products that leverage AI to solve real-world problems.</p>
                </div>
                <div className="mb-8">
                    <h2 className="font-bold">Education</h2>
                    <p>Boston College - B.S. Computer Science</p>
                    {/* <p>2024-2028</p> */}
                </div>

                <div className="mb-8">
                    <h2 className="font-bold">Interests & Hobbies</h2>
                    <ul className="list-disc list-inside">
                        <li>Formula 1 - Ferrari</li>
                        <li>NBA - Warriors</li>
                        <li>Traveling</li> 
                        {/* // My travels, able to click it and put pins on a map of where I've been */}
                        <li>Cooking</li>
                    </ul>
                </div>
            </section>
        </div>
    )
}