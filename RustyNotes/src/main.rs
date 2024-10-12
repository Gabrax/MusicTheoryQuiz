mod widgets;

use crossterm::{
    event::{self, DisableMouseCapture, EnableMouseCapture, Event, KeyCode},
    execute,
    terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
};

use std::{error::Error, io, time::Duration};
use tui::{
    backend::{Backend, CrosstermBackend},
    Terminal,
};

use widgets::{draw_ui, MenuState};

fn main() -> Result<(), Box<dyn Error>> {
    // setup terminal
    enable_raw_mode()?;
    let mut stdout = io::stdout();
    execute!(stdout, EnterAlternateScreen, EnableMouseCapture)?;
    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;

    // create app and run it
    let res = run_app(&mut terminal);

    // restore terminal
    disable_raw_mode()?;
    execute!(
        terminal.backend_mut(),
        LeaveAlternateScreen,
        DisableMouseCapture
    )?;
    terminal.show_cursor()?;

    if let Err(err) = res {
        println!("{:?}", err)
    }

    Ok(())
}

fn run_app<B: Backend>(terminal: &mut Terminal<B>) -> io::Result<()> {
    let mut menu_state = MenuState::default();
    menu_state.state.select(Some(0));

    let mut last_keypress_time = std::time::Instant::now(); // To track the last key press
    const KEYPRESS_COOLDOWN: Duration = Duration::from_millis(100); // Adjust as necessary

    loop {
        terminal.draw(|f| draw_ui(f, &mut menu_state))?;

        // Use `poll()` to check for events with a small timeout
        if event::poll(Duration::from_millis(100))? {
            if let Event::Key(key) = event::read()? {
                let now = std::time::Instant::now();
                if now.duration_since(last_keypress_time) >= KEYPRESS_COOLDOWN {
                    match key.code {
                        KeyCode::Char('q') => return Ok(()),
                        KeyCode::Down => {
                            menu_state.next();
                            last_keypress_time = now; // Update the last keypress time
                        }
                        KeyCode::Up => {
                            menu_state.previous();
                            last_keypress_time = now; // Update the last keypress time
                        }
                        KeyCode::Enter => {}
                        _ => {}
                    }
                }
            }
        }
    }
}

