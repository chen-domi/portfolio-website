export const Footer = () => {
    return (
        <footer className="mt-16 mb-16 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span>Email</span>
                    <a href="mailto:gchendom@gmail.com">gchendomi@gmail.com</a>
                </div>
                <div className="flex justify-between items-center">
                    <span>LinkedIn</span>
                    <a href="https://linkedin.com/in/chendomi" target="_blank" rel="noopener noreferrer">
                        linkedin.com/in/chendomi
                    </a>
                </div>
                <div className="flex justify-between items-center">
                    <span>X/Twitter</span>
                    <a href="https://x.com/chendominic" target="_blank" rel="noopener noreferrer">
                        @chendominic
                    </a>
                </div>
            </div>
        </footer>
    )
}