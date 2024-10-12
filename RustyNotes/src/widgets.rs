// widgets.rs

use tui::{
    backend::Backend,
    layout::{Alignment, Constraint, Direction, Layout, Rect},
    style::{Color, Modifier, Style},
    text::Spans,
    widgets::{Block, BorderType, Borders, List, ListItem, ListState},
    Frame,
};

#[derive(Default)]
pub struct MenuState {
    pub state: ListState,
    pub selected: usize,
}

impl MenuState {
    pub fn next(&mut self) {
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

    pub fn previous(&mut self) {
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

pub fn render_menu_items<B: Backend>(f: &mut Frame<B>, area: Rect, menu_state: &mut MenuState) {
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

pub fn draw_ui<B: Backend>(f: &mut Frame<B>, menu_state: &mut MenuState) {
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
