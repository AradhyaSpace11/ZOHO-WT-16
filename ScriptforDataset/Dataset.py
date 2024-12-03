import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import os

def generate_sample_data(num_students=100):
    # Generate basic student data
    divisions = ['A', 'B', 'C']
    course = {'code': 'CS101', 'name': 'Introduction to Programming'}
    
    # Division-wise class schedule and total sessions - all set to 30
    division_schedule = {
        'A': {'days': [0, 2], 'sessions': 30},    # Monday and Wednesday - 30 sessions
        'B': {'days': [1, 3], 'sessions': 30},    # Tuesday and Thursday - 30 sessions
        'C': {'days': [2, 4], 'sessions': 30}     # Wednesday and Friday - 30 sessions
    }
    
    faculty_members = [
        {'id': 'F001', 'name': 'Dr. Smith', 'email': 'smith@university.edu'},
        {'id': 'F002', 'name': 'Dr. Johnson', 'email': 'johnson@university.edu'},
        {'id': 'F003', 'name': 'Dr. Williams', 'email': 'williams@university.edu'},
        {'id': 'F004', 'name': 'Dr. Brown', 'email': 'brown@university.edu'},
        {'id': 'F005', 'name': 'Dr. Davis', 'email': 'davis@university.edu'}
    ]

    # Assign faculty to divisions
    division_faculty = {
        'A': [faculty_members[0], faculty_members[1]],
        'B': [faculty_members[2], faculty_members[3]],
        'C': [faculty_members[4], faculty_members[0]]
    }

    data = []
    
    # Start date for the semester
    start_date = datetime.now() - timedelta(days=90)
    
    for i in range(num_students):
        student_id = f'STU{str(i+1).zfill(3)}'
        student_name = f'Student {i+1}'
        division = random.choice(divisions)
        assigned_faculty = random.choice(division_faculty[division])
        
        # Generate attendance records
        class_dates = []
        current_date = start_date
        
        # Generate class dates based on division's sessions
        while len(class_dates) < division_schedule[division]['sessions']:
            if current_date.weekday() in division_schedule[division]['days']:
                class_dates.append(current_date)
            current_date += timedelta(days=1)
        
        attendance_probability = random.uniform(0.7, 1.0)
        classes_attended = 0
        
        # Generate performance data
        isa1_score = random.randint(0, 20)
        isa2_score = random.randint(0, 20)
        assignment_score = random.randint(0, 10)
        total_score = isa1_score + isa2_score + assignment_score
        performance_status = 'Above Threshold' if total_score > 25 else 'Below Threshold'
        
        # Generate attendance records with performance data
        for class_date in class_dates:
            is_present = random.random() < attendance_probability
            if is_present:
                classes_attended += 1
            
            data.append({
                'student_id': student_id,
                'student_name': student_name,
                'division': division,
                'course_code': course['code'],
                'course_name': course['name'],
                'faculty_id': assigned_faculty['id'],
                'faculty_name': assigned_faculty['name'],
                'faculty_email': assigned_faculty['email'],
                'class_date': class_date.strftime('%Y-%m-%d'),
                'is_present': is_present,
                'classes_attended': classes_attended,
                'total_classes': 30,
                'attendance_percentage': round((classes_attended / 30) * 100, 2),
                'isa1_score': isa1_score,
                'isa2_score': isa2_score,
                'assignment_score': assignment_score,
                'total_score': total_score,
                'performance_status': performance_status,
                'last_updated': datetime.now().strftime('%Y-%m-%d')
            })

    # Create output directory if it doesn't exist
    os.makedirs('output', exist_ok=True)
    
    try:
        # Convert to DataFrame and save to CSV
        df = pd.DataFrame(data)
        df.to_csv('output/student_performance_attendance_data.csv', index=False)
        
        # Generate and save feedback data
        feedback_data = generate_feedback_data(df)
        feedback_df = pd.DataFrame(feedback_data)
        feedback_df.to_csv('output/faculty_feedback_data.csv', index=False)
        return df
    except PermissionError:
        print("Error: Cannot save files. Please ensure:")
        print("1. The CSV files are not open in another program")
        print("2. You have write permissions in this directory")
        return None

def generate_feedback_data(df):
    feedback_data = []
    
    # Group by faculty and course
    for (faculty_id, faculty_name, course_code), group in df.groupby(['faculty_id', 'faculty_name', 'course_code']):
        avg_attendance = group['attendance_percentage'].mean()
        avg_performance = group['total_score'].mean()
        below_threshold = len(group[group['performance_status'] == 'Below Threshold'])
        
        feedback_template = {
            'faculty_id': faculty_id,
            'faculty_name': faculty_name,
            'course_code': course_code,
            'date_generated': datetime.now().strftime('%Y-%m-%d'),
            'avg_attendance': round(avg_attendance, 2),
            'avg_performance': round(avg_performance, 2),
            'students_below_threshold': below_threshold,
            'feedback_message': generate_feedback_message(avg_attendance, avg_performance, below_threshold)
        }
        
        feedback_data.append(feedback_template)
    
    return feedback_data

def generate_feedback_message(attendance, performance, below_threshold):
    message = f"Class Overview:\n"
    message += f"- Average attendance: {round(attendance, 2)}%\n"
    message += f"- Average performance: {round(performance, 2)}/50\n"
    message += f"- Students below threshold: {below_threshold}\n"
    
    if attendance < 75:
        message += "Attention needed on attendance improvement.\n"
    if performance < 25:
        message += "Performance improvement strategies recommended.\n"
    
    return message

if __name__ == "__main__":
    # Generate sample data
    result = generate_sample_data(100)
    if result is not None:
        print("Sample data generated successfully!")
        print("\nFiles created:")
        print("1. student_performance_attendance_data.csv")
        print("2. faculty_feedback_data.csv")