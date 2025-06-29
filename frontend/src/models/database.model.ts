export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      questions: {
        Row: {
          audio_url: string | null
          choices: Json | null
          correct_answer: string
          created_at: string | null
          difficulty: string
          id: string
          question_text: string
          question_type: string
          title: string
          updated_at: string | null
        }
        Insert: {
          audio_url?: string | null
          choices?: Json | null
          correct_answer: string
          created_at?: string | null
          difficulty?: string
          id?: string
          question_text: string
          question_type: string
          title: string
          updated_at?: string | null
        }
        Update: {
          audio_url?: string | null
          choices?: Json | null
          correct_answer?: string
          created_at?: string | null
          difficulty?: string
          id?: string
          question_text?: string
          question_type?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_exam_answers: {
        Row: {
          answer_text: string
          answered_at: string | null
          id: string
          is_correct: boolean
          user_exam_question_id: string
        }
        Insert: {
          answer_text: string
          answered_at?: string | null
          id?: string
          is_correct?: boolean
          user_exam_question_id: string
        }
        Update: {
          answer_text?: string
          answered_at?: string | null
          id?: string
          is_correct?: boolean
          user_exam_question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_exam_answers_user_exam_question_id_fkey"
            columns: ["user_exam_question_id"]
            isOneToOne: false
            referencedRelation: "user_exam_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_exam_questions: {
        Row: {
          id: string
          position: number
          question_id: string
          user_exam_id: string
        }
        Insert: {
          id?: string
          position: number
          question_id: string
          user_exam_id: string
        }
        Update: {
          id?: string
          position?: number
          question_id?: string
          user_exam_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_exam_questions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_exam_questions_user_exam_id_fkey"
            columns: ["user_exam_id"]
            isOneToOne: false
            referencedRelation: "user_exams"
            referencedColumns: ["id"]
          },
        ]
      }
      user_exams: {
        Row: {
          created_at: string | null
          current_question_index: number
          id: string
          question_count: number
          score: number
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_question_index?: number
          id?: string
          question_count?: number
          score?: number
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_question_index?: number
          id?: string
          question_count?: number
          score?: number
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_payments: {
        Row: {
          created_at: string | null
          id: string
          stripe_customer_id: string | null
          subscription_status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          stripe_customer_id?: string | null
          subscription_status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          stripe_customer_id?: string | null
          subscription_status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_user_exam: {
        Args: {
          user_id: string
          question_count: number
          p_question_type: string
        }
        Returns: string
      }
      is_email_exist: {
        Args: { emailuser: string }
        Returns: boolean
      }
      is_value_in_jsonb_array: {
        Args: { value: string; arr: Json }
        Returns: boolean
      }
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      continents: [
        "Africa",
        "Antarctica",
        "Asia",
        "Europe",
        "Oceania",
        "North America",
        "South America",
      ],
    },
  },
} as const
