#[derive(Debug)]
enum Message {
    // TODO: Define a few types of messages as used below.
    Resize = 1,
    Message = 12,
    Move = 13,
    ChangeColor = 14,
    Echo = 15,
    Quit = 16,
}

fn main() {
    println!("{:?}", Message::Resize);
    println!("{:?}", Message::Move);
    println!("{:?}", Message::Echo);
    println!("{:?}", Message::ChangeColor);
    println!("{:?}", Message::Quit);
}
