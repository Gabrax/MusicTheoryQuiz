use crossterm::{
    event::{self, DisableMouseCapture, EnableMouseCapture, Event, KeyCode},
    execute,
    terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
};

use std::{error::Error, io, time::Duration};

use tui::{
    backend::{Backend, CrosstermBackend},
    layout::{Alignment, Constraint, Direction, Layout, Rect},
    style::{Color, Modifier, Style},
    text::{Span, Spans},
    widgets::{Block, BorderType, Borders, List, ListItem, ListState},
    Frame, Terminal,
};

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
        terminal.draw(|f| ui(f, &mut menu_state))?;

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

fn ui<B: Backend>(f: &mut Frame<B>, menu_state: &mut MenuState) {
    let size = f.size();

    // Surrounding block
    let main_block = Block::default()
    .borders(Borders::ALL)
    .title("Rusty Notes")
    .title_alignment(Alignment::Center)
    .border_type(BorderType::Rounded);

    let outer_layout = Layout::default()
        .direction(Direction::Vertical)
        .constraints(
            [
                Constraint::Percentage(40), // Top margin
                Constraint::Min(5),         // Menu block area
                Constraint::Percentage(35), // Bottom margin
            ]
            .as_ref(),
        )
        .split(size);

    let inner_layout = Layout::default()
        .direction(Direction::Horizontal)
        .constraints(
            [
                Constraint::Percentage(40), // Left margin
                Constraint::Percentage(20), // Menu area
                Constraint::Percentage(60), // Right margin
            ]
            .as_ref(),
        )
        .split(outer_layout[1]);

    // Render the block in the centered area
    f.render_widget(main_block, inner_layout[1]);

    // Create an outer layout with left and right margins
    let outer_area = Layout::default()
        .direction(Direction::Vertical)
        .constraints(
            [
                Constraint::Percentage(50), // Top margin
                Constraint::Min(5),         // Menu block area
                Constraint::Percentage(50), // Bottom margin
            ]
            .as_ref(),
        )
        .split(size);

    // Create an inner layout for left and right margins
    let inner_area = Layout::default()
        .direction(Direction::Horizontal)
        .constraints(
            [
                Constraint::Percentage(45), // Left margin
                Constraint::Percentage(30), // Menu area
                Constraint::Percentage(50), // Right margin
            ]
            .as_ref(),
        )
        .split(outer_area[1]); // Use the middle area from the outer layout

    render_menu_items(f, inner_area[1], menu_state); // Render the menu in the center area
}

fn render_menu_items<B: Backend>(f: &mut Frame<B>, area: Rect, menu_state: &mut MenuState) {
    // Create the list of menu items
    let menu_items = vec![
        ListItem::new("Create new notepad"),
        ListItem::new("Your Notepads"),
        ListItem::new("Delete Notepad"),
    ];

    let menu = List::new(menu_items)
        .highlight_style(
            Style::default()
                .fg(Color::Yellow)
                .add_modifier(Modifier::BOLD),
        )
        .highlight_symbol("> ");

    // Render the menu items in the provided area
    f.render_stateful_widget(menu, area, &mut menu_state.state);
}

#[derive(Default)]
struct MenuState {
    state: ListState,
    selected: usize,
}

impl MenuState {
    fn next(&mut self) {
        let i = match self.state.selected() {
            Some(i) => {
                if i >= 2 {
                    0
                } else {
                    i + 1
                }
            }
            None => 0,
        };
        self.state.select(Some(i));
        self.selected = i;
    }

    fn previous(&mut self) {
        let i = match self.state.selected() {
            Some(i) => {
                if i == 0 {
                    2
                } else {
                    i - 1
                }
            }
            None => 0,
        };
        self.state.select(Some(i));
        self.selected = i;
    }
}
